locals {
  bucket_name = "tfstate-demo-2023"
  table_name  = "tfstate-lock"

  ecr_repo_name = "cicd-hub"
  ecr_repo_url  = "117979987706.dkr.ecr.us-east-1.amazonaws.com/cicd-hub:v1"

  my_app_cluster_name          = "my-app-cluster"
  availability_zones           = ["us-east-1a", "us-east-1b", "us-east-1c"]
  my_app_task_family           = "my-app-task"
  container_port               = 3000
  my_app_task_name             = "my-app-task"
  ecs_task_execution_role_name = "my-app-task-execution-role"

  app_load_balancer_name = "my-app-alb"
  target_group_name      = "my-app-target-group"

  my_app_service_name = "my-app-service"
}
