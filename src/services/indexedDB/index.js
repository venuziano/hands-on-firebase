import Dexie from 'dexie';

export default async function initiateDB() {
  const db = new Dexie('mylocation');
  
  db.version(1).stores({
    users: "++id, displayName, email, phoneNumber, photoURL, providerId, uuid, lat, lng",
  })

  db.open().catch((err) => {
    console.log(err.stack || err);
  })

  return db;
};