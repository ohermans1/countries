export class Country {
  constructor(
    public name: string,
    public population: string,
    public region: string,
    public capital: string[],
    public flag: string,
    public subRegion: string,
    public domain: string[],
    public languages: object,
    public borderCountries: [],
    public nativeName: string,
    public currencies: object
  ) {}
}
