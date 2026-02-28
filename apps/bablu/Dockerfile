FROM node:25-alpine AS base
# Set working directory
WORKDIR /app
# ---
FROM base AS prepare
# Replace <your-major-version> with the major version installed in your repository. For example:
# RUN yarn global add turbo@^2
RUN npm install --global turbo@^2
COPY . .
# Add lockfile and package.json's of isolated subworkspace
# Generate a partial monorepo with a pruned lockfile for a target workspace.
# Assuming "web" is the name entered in the project's package.json: { name: "web" }
RUN turbo prune bablu --docker
# ---
FROM base AS builder
# First install the dependencies (as they change less often)
COPY --from=prepare /app/out/json/ .
RUN npm install
# Build the project
COPY --from=prepare /app/out/full/ .
RUN npx turbo run build
# ---
FROM base AS runner
# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
WORKDIR /apps
COPY --from=builder /app .
CMD ["node", "./apps/bablu/dist/index"]