-- CreateTable
CREATE TABLE "_Voters" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_Voters_A_fkey" FOREIGN KEY ("A") REFERENCES "Link" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_Voters_B_fkey" FOREIGN KEY ("B") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_Voters_AB_unique" ON "_Voters"("A", "B");

-- CreateIndex
CREATE INDEX "_Voters_B_index" ON "_Voters"("B");
