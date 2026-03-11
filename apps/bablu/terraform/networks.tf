resource "aws_vpc" "bablu-vpc" {
  cidr_block           = var.vpc_cidr
  enable_dns_support   = true
  enable_dns_hostnames = true
  tags = {
    Name = "${local.name}-vpc"
  }
}

resource "aws_internet_gateway" "bablu-internet-gateway" {
  vpc_id = aws_vpc.bablu-vpc.id
  tags = {
    Name = "${local.name}-igw"
  }
}

resource "aws_subnet" "bablu-public-subnet" {
  vpc_id                  = aws_vpc.bablu-vpc.id
  cidr_block              = var.public_cidr
  availability_zone       = var.availability_zone_1a
  map_public_ip_on_launch = true
  tags = {
    Name = "${local.name}-public-subnet"
  }
}

resource "aws_route_table" "public-route-table" {
  vpc_id = aws_vpc.bablu-vpc.id
  route {
    cidr_block = var.all_ips_cidr
    gateway_id = aws_internet_gateway.bablu-internet-gateway.id
  }
  tags = {
    Name = "${local.name}-public-route-table"
  }
}

resource "aws_route_table_association" "public-subnet-association" {
  subnet_id      = aws_subnet.bablu-public-subnet.id
  route_table_id = aws_route_table.public-route-table.id
}

resource "aws_security_group" "public-security-group" {
  vpc_id = aws_vpc.bablu-vpc.id
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = [var.all_ips_cidr]
  }
  ingress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = [var.all_ips_cidr]
  }
}