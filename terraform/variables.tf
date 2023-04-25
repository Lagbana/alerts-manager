variable "do_token" {
  description = "DigitalOcean API token"
  type        = string
}

variable "node_env" {
  description = "Node environment variable"
  type        = string
}


variable "mongo_uri" {
  description = "URI for the app to connect to MongoDB"
  type        = string
}

variable "redis_url" {
  description = "URL for the app to connect to Redis"
  type        = string
}

variable "jwt_secret" {
  description = "Secret for the app to use for JWT Authentication"
  type        = string
}

variable "api_version" {
  description = "Version of the API to use"
  type        = string
}
