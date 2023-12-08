locals {
  #bucket_name = "tfstate-demo-2023"
  #table_name  = "tfstate-lock"
  
  git_repo_url   = "https://github.com/kaesar/cicddemo"
  connection_arn = "arn:aws:apprunner:us-east-1:117979987706:connection/cicd-repo/d940c059ccdd4466a82f95b50e4cdec3"
  
  service_name   = "MyDroneService"
  container_port = 3000

  # ecr_repo_name = "cicd-hub"
  # ecr_repo_url  = "117979987706.dkr.ecr.us-east-1.amazonaws.com/cicd-hub:v1"
}
