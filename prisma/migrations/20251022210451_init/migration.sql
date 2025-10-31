-- CreateTable
CREATE TABLE "FallbackResponse"
(
    "id"          INTEGER  NOT NULL PRIMARY KEY AUTOINCREMENT,
    "personality" TEXT     NOT NULL,
    "language"    TEXT     NOT NULL,
    "category"    TEXT     NOT NULL,
    "text"        TEXT     NOT NULL,
    "createdAt"   DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Keyword"
(
    "id"       INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "word"     TEXT    NOT NULL,
    "language" TEXT    NOT NULL
);

-- CreateTable
CREATE TABLE "ResponseKeyword"
(
    "responseId" INTEGER NOT NULL,
    "keywordId"  INTEGER NOT NULL,

    PRIMARY KEY ("responseId", "keywordId"),
    CONSTRAINT "ResponseKeyword_responseId_fkey" FOREIGN KEY ("responseId") REFERENCES "FallbackResponse" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "ResponseKeyword_keywordId_fkey" FOREIGN KEY ("keywordId") REFERENCES "Keyword" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "FallbackResponse_personality_language_category_idx" ON "FallbackResponse" ("personality", "language", "category");

-- CreateIndex
CREATE INDEX "Keyword_word_idx" ON "Keyword" ("word");

-- CreateIndex
CREATE UNIQUE INDEX "Keyword_word_language_key" ON "Keyword" ("word", "language");

-- CreateIndex
CREATE INDEX "ResponseKeyword_responseId_idx" ON "ResponseKeyword" ("responseId");

-- CreateIndex
CREATE INDEX "ResponseKeyword_keywordId_idx" ON "ResponseKeyword" ("keywordId");
