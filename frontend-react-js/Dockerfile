FROM 596027898727.dkr.ecr.us-east-2.amazonaws.com/cruddur-node-js

ENV PORT=3000

COPY . /frontend-react-js
WORKDIR /frontend-react-js
RUN npm install
EXPOSE ${PORT}
CMD ["npm", "start"]