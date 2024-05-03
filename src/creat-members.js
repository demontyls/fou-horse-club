const members = [
  {
    fullname: 'Хозе-Рауль Капабланка',
    description: 'Чемпион мира по шахматам'
  },
  {
    fullname: 'Эммануил Ласкер',
    description: 'Чемпион мира по шахматам'
  },
  {
    fullname: 'Александр Алехин',
    description: 'Чемпион мира по шахматам'
  },
  {
    fullname: 'Арон Нимцович',
    description: 'Чемпион мира по шахматам'
  },
  {
    fullname: 'Рихард Рети',
    description: 'Чемпион мира по шахматам'
  },
  {
    fullname: 'Остап Бендер',
    description: 'Гроссмейстер'
  }
];

export const nodeMembers = members.map((member) => {
  return (
    `<div class="block-members__card">
        <div class="block-members__card__avatar"></div>
        <div class="block-members__card__fullname">${member.fullname}</div>
        <div class="block-members__card__desc">${member.description}</div>
        <button class="btn-sm btn-outline-info">Подробнее</button>
    </div>`
  );
});