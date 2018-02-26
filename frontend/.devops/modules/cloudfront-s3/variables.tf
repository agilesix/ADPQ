variable region {
  default = "us-east-1"
}

variable project {
  default = "project"
}

variable environment {
  default = "staging"
}

variable bucket_name {
  description = "The name of the S3 bucket to create."
}

variable aliases {
  type    = "list"
  default = []
}

variable deployer {}

variable routing_rules {
  default = ""
}

variable not-found-response-path {
  default = "/404.html"
}

variable "tags" {
  type        = "map"
  description = "Optional Tags"
  default     = {}
}

variable "forward-query-string" {
  description = "Forward the query string to the origin"
  default     = false
}
