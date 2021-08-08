/* eslint-disable camelcase */
const mapDBToModel = ({
  id,
  title,
  year,
  performer,
  genre,
  duration,
  inserted_at,
  updated_at,
}) => ({
  id,
  title,
  year,
  performer,
  genre,
  duration,
  insertedAt: inserted_at,
  updatedAt: updated_at,
});

const mapDBToPlaylist = ({
  id,
  name,
  username,
}) => ({
  id,
  name,
  username,
});

const mapDBToPlaylistTest = ({
  id,
  name,
  owner,
}) => ({
  id,
  name,
  owner,
});

module.exports = { mapDBToModel, mapDBToPlaylist, mapDBToPlaylistTest };
