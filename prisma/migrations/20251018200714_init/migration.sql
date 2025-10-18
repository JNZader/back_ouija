-- CreateTable
CREATE TABLE "FallbackResponse" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "personality" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "keywords" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE INDEX "FallbackResponse_personality_category_language_idx" ON "FallbackResponse"("personality", "category", "language");
