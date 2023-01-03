export const generateUUID = (short?: boolean) => {
  if (short) return generateUID();

  return uuidv4();
};

function uuidv4(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    let r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function generateUID(): string {
  // I generate the UID from two parts here
  // to ensure the random number provide enough bits.
  let firstPart: any = (Math.random() * 46656) | 0;
  let secondPart: any = (Math.random() * 46656) | 0;
  firstPart = ('000' + firstPart.toString(36)).slice(-3);
  secondPart = ('000' + secondPart.toString(36)).slice(-3);

  return firstPart + secondPart;
}

export type GenerateNegativeNumberOptions = {
  obj?: {
    pool: any[];
    key: string;
  };
  flat?: number[];
};

const MAX_NEGATIVE_NUMBER = -123456789;

export function generateNegativeNumber({flat, obj}: GenerateNegativeNumberOptions = {}): number {
  if (flat) for (let x = -1; x > MAX_NEGATIVE_NUMBER; x -= 1) if (flat.indexOf(x) === -1) return x;

  if (!obj) return -1;

  const pool = obj.pool.map(d => d[obj.key]);

  return generateNegativeNumber({flat: pool});
}
