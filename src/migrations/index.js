import v1 from './v1';

const migrations = [
  v1,
];

// ([Function], Number) -> Number
const runMigration = async (arr, v) => {
  const f = arr[v];
  if (f) {
    await f();
    return runMigration(arr, v + 1);
  }

  return v;
};

export default async (fromVersion) => {
  const v = parseInt(fromVersion, 10);

  return runMigration(migrations, v);
};
