const V1 = { semantic: "1.0.0", name: "v1" };

const PossibleVersions = new Set([V1.semantic]);

function isVersion(version: string): boolean {
  return PossibleVersions.has(version);
}

const VersionMap = new Map<string, string>([[V1.semantic, V1.name]]);

function getVersion(version: string): string {
  return VersionMap.get(version) as string;
}

const VERSIONS = {
  V1: V1.name,
};

export { isVersion, getVersion, VERSIONS };
