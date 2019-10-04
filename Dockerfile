FROM node:10.16.0-slim as builder 
ADD . /app
WORKDIR /app
RUN ["npm","install"]
RUN ["npm","run","build"]


FROM nginx:1.17.2
COPY --from=builder /app/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html