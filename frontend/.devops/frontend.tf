# TODO route53
# TODO ensure https

module "static_site" {
  source      = "./modules/cloudfront-s3"
  bucket_name = "${var.environment}-a2tool"
  environment = "${var.environment}"
  project     = "a2tool"
  deployer    = "${var.deployer}"
}

variable environment {
  default = "staging"
}

variable deployer {}
