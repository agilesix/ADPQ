# Terraform files for cloudfront / s3 deploy

Creates a cloudfront distribution,
an iam policy for s3,
and a s3 bucket.

## General use

In order to use the `aws` provider two credential environment variables must be set.
```
export AWS_SECRET_ACCESS_KEY="your-secret-key"
export AWS_ACCESS_KEY_ID="your-aws-key-id"
```
### commands

Most of these commands will
ask you to set a `deployer`
variable.
This is meant to be the
name of the Iam role
that is allowed to push to the s3 bucket.
They will also ask for a aws region
in which to operate,
this defaults to `us-east-1`.

#### plan
```
terraform plan
```
Will show you what,
if any,
work needs to be done
to bring the infrastructure up to date.

#### apply
```
terraform apply
```
Runs the terraform plan
and updates the infrastructure.

#### destroy
```
terraform destroy
```
Pulls down the current
infrastructure.

## Using with CircleCI

The big difference is
where terraform stores it's state.
A [backend](https://www.terraform.io/docs/backends)
will have to be set up,
[s3](https://www.terraform.io/docs/backends/types/s3.html) makes the most sense.

In addition to setting aws credentials.
Other terraform variables
(`deployer` for example)
can be set through environment variables
of the form `TF_VAR_<variable_name>`.
