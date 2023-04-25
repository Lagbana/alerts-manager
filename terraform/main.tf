terraform {
  required_providers {
    digitalocean = {
      source  = "digitalocean/digitalocean"
      version = "~> 2.0"
    }
  }
}

provider "digitalocean" {
  token = var.do_token
}

resource "digitalocean_app" "naads-alert" {
  spec {
    name   = "naads-alert"
    region = "nyc3"

    service {
      name = "naads-alert-server"

      routes {
        path = "/"
      }

      image {
        registry_type = "DOCR"
        repository    = "registry.digitalocean.com/naads-alerts/naads-alert-server"
        tag           = "latest"

        deploy_on_push {
          enabled = true
        }

      }

      instance_size_slug = "basic-xxs"
      instance_count     = 1

      env {
        key   = "NODE_ENV"
        value = var.node_env
      }

      env {
        key   = "MONGO_URI"
        value = var.mongo_uri
      }

      env {
        key   = "REDIS_URL"
        value = var.redis_url
      }

      env {
        key   = "JWT_SECRET"
        value = var.jwt_secret
      }

      env {
        key   = "API_VERSION"
        value = var.api_version
      }
    }
  }
}

output "app_url" {
  value = digitalocean_app.naads-alert.live_url
}
