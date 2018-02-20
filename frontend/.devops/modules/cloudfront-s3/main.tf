# Modified from https://github.com/ringods/terraform-website-s3-cloudfront-route53/tree/master/site-main
## Configure the AWS provider for the specific region

provider "aws" {
  alias  = "${var.region}"
  region = "${var.region}"
}

## Configure the bucket and static website hosting

data "template_file" "bucket_policy" {
  template = "${file("${path.module}/website_bucket_policy.json")}"

  vars {
    bucket = "${var.bucket_name}"
    secret = "${var.duplicate-content-penalty-secret}"
  }
}

resource "aws_s3_bucket" "website_bucket" {
  provider = "aws.${var.region}"
  bucket   = "${var.bucket_name}"
  policy   = "${data.template_file.bucket_policy.rendered}"

  website {
    index_document = "index.html"
    error_document = "404.html"
    routing_rules  = "${var.routing_rules}"
  }

  tags = "${merge("${var.tags}",map("Name", "${var.project}-${var.environment}-${var.domain}", "Environment", "${var.environment}", "Project", "${var.project}"))}"
}

## Configure the credentials and access to the bucket for a deployment user

data "template_file" "deployer_role_policy_file" {
  template = "${file("${path.module}/deployer_role_policy.json")}"

  vars {
    bucket = "${var.bucket_name}"
  }
}

resource "aws_iam_policy" "site_deployer_policy" {
  provider    = "aws.${var.region}"
  name        = "${var.bucket_name}.deployer"
  path        = "/"
  description = "Policy allowing to publish a new version of the website to the S3 bucket"
  policy      = "${data.template_file.deployer_role_policy_file.rendered}"
}

resource "aws_iam_policy_attachment" "site-deployer-attach-user-policy" {
  provider   = "aws.${var.region}"
  name       = "${var.bucket_name}-deployer-policy-attachment"
  users      = ["${var.deployer}"]
  policy_arn = "${aws_iam_policy.site_deployer_policy.arn}"
}

## Create a Cloudfront distribution for the static website

resource "aws_cloudfront_distribution" "website_cdn" {
  enabled      = true
  price_class  = "PriceClass_200"
  http_version = "http1.1"

  "origin" {
    origin_id   = "origin-bucket-${aws_s3_bucket.website_bucket.id}"
    domain_name = "${aws_s3_bucket.website_bucket.website_endpoint}"

    custom_origin_config {
      origin_protocol_policy = "http-only"
      http_port              = "80"
      https_port             = "443"
      origin_ssl_protocols   = ["TLSv1"]
    }

    custom_header {
      name  = "User-Agent"
      value = "${var.duplicate-content-penalty-secret}"
    }
  }

  default_root_object = "index.html"

  "default_cache_behavior" {
    allowed_methods = ["GET", "HEAD", "DELETE", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods  = ["GET", "HEAD"]

    "forwarded_values" {
      query_string = "${var.forward-query-string}"

      cookies {
        forward = "none"
      }
    }

    min_ttl          = "0"
    default_ttl      = "300"                                              //3600
    max_ttl          = "1200"                                             //86400
    target_origin_id = "origin-bucket-${aws_s3_bucket.website_bucket.id}"

    // This redirects any HTTP request to HTTPS. Security first!
    viewer_protocol_policy = "redirect-to-https"
    compress               = true
  }

  "restrictions" {
    "geo_restriction" {
      restriction_type = "none"
    }
  }

  "viewer_certificate" {
    cloudfront_default_certificate = true
  }

  aliases = ["${var.domain}"]

  tags = "${merge("${var.tags}",map("Name", "${var.project}-${var.environment}-${var.domain}", "Environment", "${var.environment}", "Project", "${var.project}"))}"
}
