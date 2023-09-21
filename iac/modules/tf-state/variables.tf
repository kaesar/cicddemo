variable "bucket_name" {
  description = "S3 Bucket Name for Terraform State"
  type        = string
  validation {
    condition     = can(regex("^([a-z0-9]{1}[a-z0-9-]{1,61}[a-z0-9]{1})$", var.bucket_name))
    error_message = "Check the Bucket Name introduced"
  }
}

variable "table_name" {
  description = "Dynamo Table name for Terraform Lock"
  type        = string
}
