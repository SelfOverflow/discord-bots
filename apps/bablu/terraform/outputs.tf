output "vpc_id" {
  value = aws_vpc.bablu-vpc.id
}

output "public_subnet_id" {
  value = aws_subnet.bablu-public-subnet.id
}
