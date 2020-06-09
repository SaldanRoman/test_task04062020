import { SearchContactPipe } from './search-contact.pipe';
import { User } from '../services/users.service';

describe('SearchContactPipe', () => {
  const pipe = new SearchContactPipe();
  const users: User[] = [
    {
      avatarUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQnDNb9MeJ_vXOSCJEsjnbmmpVlzRkt1TIFYzdyrQAuHQi_yxP0&usqp=CAU',
      id: '-M99gZ-D3IDU78B4dJpo',
      lastMessage:
        'If you receive an invitation from Chuck Norris to attend a Texas Tea Party rally, it is actually his secret code for you to come over for a fun filled evening of jello shooters, beer pong & strip poker.',
      logName: '@Roma',
      name: 'Roman',
      status: 'online',
    },
    {
      avatarUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQnDNb9MeJ_vXOSCJEsjnbmmpVlzRkt1TIFYzdyrQAuHQi_yxP0&usqp=CAU',
      id: '-M99i3Nathvl_SaO6jHp',
      lastMessage:
        'If you receive an invitation from Chuck Norris to attend a Texas Tea Party rally, it is actually his secret code for you to come over for a fun filled evening of jello shooters, beer pong & strip poker.',
      logName: '@Romanivna',
      name: 'Tanya',
      status: 'online',
    },
    {
      avatarUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQnDNb9MeJ_vXOSCJEsjnbmmpVlzRkt1TIFYzdyrQAuHQi_yxP0&usqp=CAU',
      id: '-M99iEav1uwzeI4eMuE_',
      lastMessage:
        'If you receive an invitation from Chuck Norris to attend a Texas Tea Party rally, it is actually his secret code for you to come over for a fun filled evening of jello shooters, beer pong & strip poker.',
      logName: '@Maks',
      name: 'Maks',
      status: 'online',
    },
  ];

  const filtredArray: User[] = [
    {
      avatarUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQnDNb9MeJ_vXOSCJEsjnbmmpVlzRkt1TIFYzdyrQAuHQi_yxP0&usqp=CAU',
      id: '-M99gZ-D3IDU78B4dJpo',
      lastMessage:
        'If you receive an invitation from Chuck Norris to attend a Texas Tea Party rally, it is actually his secret code for you to come over for a fun filled evening of jello shooters, beer pong & strip poker.',
      logName: '@Roma',
      name: 'Roman',
      status: 'online',
    },
  ];

  it('should return fitred arrey of Users', () => {
    expect(pipe.transform(users, 'Roma')).toBeTruthy(filtredArray);
  });

  it('should return arrey of Users', () => {
    expect(pipe.transform(users, '')).toBeTruthy(users);
  });
});
