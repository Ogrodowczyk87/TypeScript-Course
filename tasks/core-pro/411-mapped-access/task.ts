type PagesMap = {
  homepage: string;
  about: string;
  contact: string;
};


type PagesAccess = {
  homepage: boolean;
  about: boolean;
  contact: boolean;
};


export function checkAccess(map: PagesMap): PagesAccess {
  return {
    homepage: !!map.homepage,
    about: !!map.about,
    contact: !!map.contact,
  };
}
