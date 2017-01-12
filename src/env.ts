function _toBoolean(text: string = ''): boolean {
  return ['1', 'true', 'yes'].indexOf(text.toLowerCase()) >= 0;
}

function _toNumber(text: string = ''): number {
  return +text;
}

export interface Env {
  debug: boolean;
  nodeEnv: string;
}

export const env: Env = {
  debug: _toBoolean(process.env.DEBUG),
  nodeEnv: process.env.NODE_ENV || 'development',
};
