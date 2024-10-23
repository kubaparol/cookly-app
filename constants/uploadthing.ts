type PowOf2 = 1 | 2 | 4 | 8 | 16 | 32 | 64 | 128 | 256 | 512 | 1024;
type SizeUnit = 'B' | 'KB' | 'MB' | 'GB';
type FileSize = `${PowOf2}${SizeUnit}`;

export const MAX_FILE_SIZE: FileSize = '4MB';
