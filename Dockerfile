FROM node:16.3-alpine3.11
COPY script/index.js /script/
CMD ["node","/script/index.js"]