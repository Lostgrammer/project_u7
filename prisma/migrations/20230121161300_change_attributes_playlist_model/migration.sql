/*
  Warnings:

  - You are about to drop the column `album` on the `playlist` table. All the data in the column will be lost.
  - You are about to drop the column `artist` on the `playlist` table. All the data in the column will be lost.
  - You are about to drop the column `duration` on the `playlist` table. All the data in the column will be lost.
  - You are about to drop the column `genre` on the `playlist` table. All the data in the column will be lost.
  - You are about to drop the column `year` on the `playlist` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `PlayList_album_key` ON `playlist`;

-- DropIndex
DROP INDEX `PlayList_artist_key` ON `playlist`;

-- AlterTable
ALTER TABLE `playlist` DROP COLUMN `album`,
    DROP COLUMN `artist`,
    DROP COLUMN `duration`,
    DROP COLUMN `genre`,
    DROP COLUMN `year`;
