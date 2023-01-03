export interface IconType {
  name: string;
  path: string[];
  tags: string[];
}

export const iconList = (iconSet: any): IconType[] => {
  const list: IconType[] = [];
  iconSet.selection.forEach((icon: any, indx: number) => {
    list.push({
      name: icon.name,
      path: iconSet.icons[indx].paths,
      tags: iconSet.icons[indx].tags,
    });
  });
  return list;
};

export default iconList;
