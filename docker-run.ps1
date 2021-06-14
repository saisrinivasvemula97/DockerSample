docker build -t docker-proj .

docker run -it --name=dockerProj --rm  -v "C:\Users\hv253\Desktop\Projects\docker\test:/home/data" -v "C:\Users\hv253\Desktop\Projects\docker:/home/output"  docker-proj:latest