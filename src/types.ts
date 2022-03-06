export type GeneratorType<Yield = unknown, TNext = any, ReturnType = void> = Generator<
  Yield,
  ReturnType,
  TNext
>;
