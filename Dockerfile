# nextjs example: https://github.com/vercel/next.js/blob/canary/examples/with-docker/Dockerfile

# Build and test
ARG REGISTRY
FROM node:19.4-alpine3.17 as build

# Copy source code
WORKDIR /home/node/app
COPY package.json yarn.lock /home/node/app

# Install all dependencies
RUN yarn install --unsafe-perm --frozen-lockfile

# Copy the rest of the application
COPY . .

# Build 
RUN yarn build

# Deployment
FROM node:19.4-alpine3.17
WORKDIR /home/node/app 

# COPY production dependencies and code
COPY /data/adion/gpu-project-fe-test/.env /home/node/app/
COPY --from=build /home/node/app/.next /home/node/app/.next
COPY --from=build /home/node/app/node_modules /home/node/app/node_modules
COPY --from=build /home/node/app/public /home/node/app/public
COPY --from=build /home/node/app/tsconfig.json /home/node/app/
COPY --from=build /home/node/app/package.json /home/node/app/

# Expose port
EXPOSE 8898

USER node
ENV NODE_ENV production

CMD ["yarn", "start", "-p", "8898"]
