export function filterByDate<T extends {

createdAt: Date;

}>(

items: T[],

start: Date | null,

end: Date | null,

) {

  return items.filter(item => {

    if (

      start &&

      item.createdAt < start

    ) {

      return false;

    }

    if (

      end &&

      item.createdAt > end

    ) {

      return false;

    }

    return true;

  });

}