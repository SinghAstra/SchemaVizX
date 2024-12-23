I want to build Semantic Search Web app which fetches content from github api and makes it semantic friendly.

In future i will be building pipeline for now i am just using api route since the goal for now is build to working MVP

Tech Stack : Next Js + Shadcn + Supabase

1. Public Routes
   / # Landing/Home Page
   /auth/login # GitHub Authentication / Google Authentication

2. Private Routes
   /search # Repository Search Interface
   /processing/[repositoryId] # status of the repository
   /repository/[id] # Individual Repository Details
   /explore # Knowledge Graph Visualization
   /dashboard # User's Saved Repositories
   /profile # User Profile and Settings
   /repository/new, # New Repository Submission
   /repository/import # GitHub Repository Import

This is my schema
generator client {
provider = "prisma-client-js"
}

datasource db {
provider = "postgresql"
url = env("DATABASE_URL")
}

model User {
id String @id @default(cuid())
email String @unique
emailVerified DateTime?
name String?
image String?

createdAt DateTime @default(now())
updatedAt DateTime @updatedAt

// Relationships
accounts Account[]
sessions Session[]
repositories Repository[]
}

model Account {
id String @id @default(cuid())
userId String
type String
provider String
providerAccountId String
refresh_token String?
access_token String?
expires_at Int?
token_type String?
scope String?
id_token String?
session_state String?

user User @relation(fields: [userId], references: [id], onDelete: Cascade)

@@unique([provider, providerAccountId])
}

model Session {
id String @id @default(cuid())
sessionToken String @unique
userId String
expires DateTime
user User @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model VerificationToken {
identifier String
token String @unique
expires DateTime

@@unique([identifier, token])
}

model Repository {
id String @id @default(cuid())
githubId Int @unique
name String
fullName String
description String?
status RepositoryStatus @default(PENDING)
owner String
url String
userId String
user User @relation(fields: [userId], references: [id])
chunks RepositoryChunk[]
}

model RepositoryChunk {
id String @id @default(cuid())
repositoryId String
repository Repository @relation(fields: [repositoryId], references: [id], onDelete: Cascade)
content String
type String
filepath String
embeddings Float[]
keywords String[]
}

enum UserRole {
GUEST
USER
ADMIN  
}

enum RepositoryStatus {
PENDING
SUCCESS
}
