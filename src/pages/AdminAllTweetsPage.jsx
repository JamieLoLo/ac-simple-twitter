import styles from './AdminAllTweetsPage.module.scss'
import AdminTweetItem from '../components/AdminTweetItem'
import { AdminGrid } from '../Layout/GridSystemWrapper'
import { useLocation } from 'react-router-dom'

const response = [
    {
        "id": 4,
        "description": "Eligendi temporibus est et debitis aperiam. Volupt",
        "UserId": 14,
        "createdAt": "2022-12-10T08:08:53.000Z",
        "updatedAt": "2022-12-10T08:08:53.000Z",
        "User": {
            "id": 14,
            "account": "user1",
            "name": "User1",
            "avatar": "https://loremflickr.com/320/240/logo/?lock=1"
        }
    },
    {
        "id": 14,
        "description": "Facilis in ducimus. Expedita fuga iste aspernatur ",
        "UserId": 14,
        "createdAt": "2022-12-10T08:08:53.000Z",
        "updatedAt": "2022-12-10T08:08:53.000Z",
        "User": {
            "id": 14,
            "account": "user1",
            "name": "User1",
            "avatar": "https://loremflickr.com/320/240/logo/?lock=1"
        }
    },
    {
        "id": 24,
        "description": "Molestias sequi qui officiis reprehenderit numquam",
        "UserId": 14,
        "createdAt": "2022-12-10T08:08:53.000Z",
        "updatedAt": "2022-12-10T08:08:53.000Z",
        "User": {
            "id": 14,
            "account": "user1",
            "name": "User1",
            "avatar": "https://loremflickr.com/320/240/logo/?lock=1"
        }
    },
    {
        "id": 34,
        "description": "velit",
        "UserId": 14,
        "createdAt": "2022-12-10T08:08:53.000Z",
        "updatedAt": "2022-12-10T08:08:53.000Z",
        "User": {
            "id": 14,
            "account": "user1",
            "name": "User1",
            "avatar": "https://loremflickr.com/320/240/logo/?lock=1"
        }
    },
    {
        "id": 44,
        "description": "Sunt necessitatibus optio aut omnis voluptas porro",
        "UserId": 14,
        "createdAt": "2022-12-10T08:08:53.000Z",
        "updatedAt": "2022-12-10T08:08:53.000Z",
        "User": {
            "id": 14,
            "account": "user1",
            "name": "User1",
            "avatar": "https://loremflickr.com/320/240/logo/?lock=1"
        }
    },
    {
        "id": 54,
        "description": "Autem minima omnis distinctio laboriosam doloribus",
        "UserId": 14,
        "createdAt": "2022-12-10T08:08:53.000Z",
        "updatedAt": "2022-12-10T08:08:53.000Z",
        "User": {
            "id": 14,
            "account": "user1",
            "name": "User1",
            "avatar": "https://loremflickr.com/320/240/logo/?lock=1"
        }
    },
    {
        "id": 64,
        "description": "Quas rerum voluptas et magnam magni sint id et.",
        "UserId": 14,
        "createdAt": "2022-12-10T08:08:53.000Z",
        "updatedAt": "2022-12-10T08:08:53.000Z",
        "User": {
            "id": 14,
            "account": "user1",
            "name": "User1",
            "avatar": "https://loremflickr.com/320/240/logo/?lock=1"
        }
    },
    {
        "id": 74,
        "description": "Eum odio rem molestiae. Quo perspiciatis qui culpa",
        "UserId": 14,
        "createdAt": "2022-12-10T08:08:53.000Z",
        "updatedAt": "2022-12-10T08:08:53.000Z",
        "User": {
            "id": 14,
            "account": "user1",
            "name": "User1",
            "avatar": "https://loremflickr.com/320/240/logo/?lock=1"
        }
    },
    {
        "id": 84,
        "description": "Non dolorem dicta eos voluptatem ut iure culpa aut",
        "UserId": 14,
        "createdAt": "2022-12-10T08:08:53.000Z",
        "updatedAt": "2022-12-10T08:08:53.000Z",
        "User": {
            "id": 14,
            "account": "user1",
            "name": "User1",
            "avatar": "https://loremflickr.com/320/240/logo/?lock=1"
        }
    },
    {
        "id": 94,
        "description": "Dolorem sint mollitia omnis. Voluptatem vel suscip",
        "UserId": 14,
        "createdAt": "2022-12-10T08:08:53.000Z",
        "updatedAt": "2022-12-10T08:08:53.000Z",
        "User": {
            "id": 14,
            "account": "user1",
            "name": "User1",
            "avatar": "https://loremflickr.com/320/240/logo/?lock=1"
        }
    },
    {
        "id": 104,
        "description": "Deserunt non impedit quo et repudiandae voluptas. ",
        "UserId": 24,
        "createdAt": "2022-12-10T08:08:53.000Z",
        "updatedAt": "2022-12-10T08:08:53.000Z",
        "User": {
            "id": 24,
            "account": "user2",
            "name": "User2",
            "avatar": "https://loremflickr.com/320/240/logo/?lock=2"
        }
    },
    {
        "id": 114,
        "description": "Veritatis dolorem dolorum blanditiis tempora saepe",
        "UserId": 24,
        "createdAt": "2022-12-10T08:08:53.000Z",
        "updatedAt": "2022-12-10T08:08:53.000Z",
        "User": {
            "id": 24,
            "account": "user2",
            "name": "User2",
            "avatar": "https://loremflickr.com/320/240/logo/?lock=2"
        }
    },
    {
        "id": 124,
        "description": "Sequi hic quo ut dolor magni expedita sit ut itaqu",
        "UserId": 24,
        "createdAt": "2022-12-10T08:08:53.000Z",
        "updatedAt": "2022-12-10T08:08:53.000Z",
        "User": {
            "id": 24,
            "account": "user2",
            "name": "User2",
            "avatar": "https://loremflickr.com/320/240/logo/?lock=2"
        }
    },
    {
        "id": 134,
        "description": "nihil aut aut",
        "UserId": 24,
        "createdAt": "2022-12-10T08:08:53.000Z",
        "updatedAt": "2022-12-10T08:08:53.000Z",
        "User": {
            "id": 24,
            "account": "user2",
            "name": "User2",
            "avatar": "https://loremflickr.com/320/240/logo/?lock=2"
        }
    },
    {
        "id": 144,
        "description": "Similique repellendus quam debitis quae officiis q",
        "UserId": 24,
        "createdAt": "2022-12-10T08:08:53.000Z",
        "updatedAt": "2022-12-10T08:08:53.000Z",
        "User": {
            "id": 24,
            "account": "user2",
            "name": "User2",
            "avatar": "https://loremflickr.com/320/240/logo/?lock=2"
        }
    },
    {
        "id": 154,
        "description": "Molestiae qui dolorum dolore cumque tempora.",
        "UserId": 24,
        "createdAt": "2022-12-10T08:08:53.000Z",
        "updatedAt": "2022-12-10T08:08:53.000Z",
        "User": {
            "id": 24,
            "account": "user2",
            "name": "User2",
            "avatar": "https://loremflickr.com/320/240/logo/?lock=2"
        }
    },
    {
        "id": 164,
        "description": "similique maxime quis",
        "UserId": 24,
        "createdAt": "2022-12-10T08:08:53.000Z",
        "updatedAt": "2022-12-10T08:08:53.000Z",
        "User": {
            "id": 24,
            "account": "user2",
            "name": "User2",
            "avatar": "https://loremflickr.com/320/240/logo/?lock=2"
        }
    },
    {
        "id": 174,
        "description": "Eius molestiae perferendis omnis autem et magni.",
        "UserId": 24,
        "createdAt": "2022-12-10T08:08:53.000Z",
        "updatedAt": "2022-12-10T08:08:53.000Z",
        "User": {
            "id": 24,
            "account": "user2",
            "name": "User2",
            "avatar": "https://loremflickr.com/320/240/logo/?lock=2"
        }
    },
    {
        "id": 184,
        "description": "eum",
        "UserId": 24,
        "createdAt": "2022-12-10T08:08:53.000Z",
        "updatedAt": "2022-12-10T08:08:53.000Z",
        "User": {
            "id": 24,
            "account": "user2",
            "name": "User2",
            "avatar": "https://loremflickr.com/320/240/logo/?lock=2"
        }
    },
    {
        "id": 194,
        "description": "placeat",
        "UserId": 24,
        "createdAt": "2022-12-10T08:08:53.000Z",
        "updatedAt": "2022-12-10T08:08:53.000Z",
        "User": {
            "id": 24,
            "account": "user2",
            "name": "User2",
            "avatar": "https://loremflickr.com/320/240/logo/?lock=2"
        }
    },
    {
        "id": 204,
        "description": "Nesciunt non architecto est porro repellat in. Lau",
        "UserId": 34,
        "createdAt": "2022-12-10T08:08:53.000Z",
        "updatedAt": "2022-12-10T08:08:53.000Z",
        "User": {
            "id": 34,
            "account": "user3",
            "name": "User3",
            "avatar": "https://loremflickr.com/320/240/logo/?lock=3"
        }
    },
    {
        "id": 214,
        "description": "Ut error omnis ex occaecati et dolores blanditiis.",
        "UserId": 34,
        "createdAt": "2022-12-10T08:08:53.000Z",
        "updatedAt": "2022-12-10T08:08:53.000Z",
        "User": {
            "id": 34,
            "account": "user3",
            "name": "User3",
            "avatar": "https://loremflickr.com/320/240/logo/?lock=3"
        }
    },
    {
        "id": 224,
        "description": "in",
        "UserId": 34,
        "createdAt": "2022-12-10T08:08:53.000Z",
        "updatedAt": "2022-12-10T08:08:53.000Z",
        "User": {
            "id": 34,
            "account": "user3",
            "name": "User3",
            "avatar": "https://loremflickr.com/320/240/logo/?lock=3"
        }
    },
    {
        "id": 234,
        "description": "nam",
        "UserId": 34,
        "createdAt": "2022-12-10T08:08:53.000Z",
        "updatedAt": "2022-12-10T08:08:53.000Z",
        "User": {
            "id": 34,
            "account": "user3",
            "name": "User3",
            "avatar": "https://loremflickr.com/320/240/logo/?lock=3"
        }
    },
    {
        "id": 244,
        "description": "in recusandae consequatur",
        "UserId": 34,
        "createdAt": "2022-12-10T08:08:53.000Z",
        "updatedAt": "2022-12-10T08:08:53.000Z",
        "User": {
            "id": 34,
            "account": "user3",
            "name": "User3",
            "avatar": "https://loremflickr.com/320/240/logo/?lock=3"
        }
    },
    {
        "id": 254,
        "description": "Qui fugiat ut nulla voluptate in. Quidem tempore u",
        "UserId": 34,
        "createdAt": "2022-12-10T08:08:53.000Z",
        "updatedAt": "2022-12-10T08:08:53.000Z",
        "User": {
            "id": 34,
            "account": "user3",
            "name": "User3",
            "avatar": "https://loremflickr.com/320/240/logo/?lock=3"
        }
    },
    {
        "id": 264,
        "description": "quisquam",
        "UserId": 34,
        "createdAt": "2022-12-10T08:08:53.000Z",
        "updatedAt": "2022-12-10T08:08:53.000Z",
        "User": {
            "id": 34,
            "account": "user3",
            "name": "User3",
            "avatar": "https://loremflickr.com/320/240/logo/?lock=3"
        }
    },
    {
        "id": 274,
        "description": "nihil fugit a",
        "UserId": 34,
        "createdAt": "2022-12-10T08:08:53.000Z",
        "updatedAt": "2022-12-10T08:08:53.000Z",
        "User": {
            "id": 34,
            "account": "user3",
            "name": "User3",
            "avatar": "https://loremflickr.com/320/240/logo/?lock=3"
        }
    },
    {
        "id": 284,
        "description": "Mollitia vel qui molestias.",
        "UserId": 34,
        "createdAt": "2022-12-10T08:08:53.000Z",
        "updatedAt": "2022-12-10T08:08:53.000Z",
        "User": {
            "id": 34,
            "account": "user3",
            "name": "User3",
            "avatar": "https://loremflickr.com/320/240/logo/?lock=3"
        }
    },
    {
        "id": 294,
        "description": "Magni in doloremque qui reiciendis. Explicabo et o",
        "UserId": 34,
        "createdAt": "2022-12-10T08:08:53.000Z",
        "updatedAt": "2022-12-10T08:08:53.000Z",
        "User": {
            "id": 34,
            "account": "user3",
            "name": "User3",
            "avatar": "https://loremflickr.com/320/240/logo/?lock=3"
        }
    },
    {
        "id": 304,
        "description": "Reprehenderit sunt qui illo sint voluptates evenie",
        "UserId": 44,
        "createdAt": "2022-12-10T08:08:53.000Z",
        "updatedAt": "2022-12-10T08:08:53.000Z",
        "User": {
            "id": 44,
            "account": "user4",
            "name": "User4",
            "avatar": "https://loremflickr.com/320/240/logo/?lock=4"
        }
    },
    {
        "id": 314,
        "description": "Voluptatibus soluta et consequuntur. Ducimus et in",
        "UserId": 44,
        "createdAt": "2022-12-10T08:08:53.000Z",
        "updatedAt": "2022-12-10T08:08:53.000Z",
        "User": {
            "id": 44,
            "account": "user4",
            "name": "User4",
            "avatar": "https://loremflickr.com/320/240/logo/?lock=4"
        }
    },
    {
        "id": 324,
        "description": "esse",
        "UserId": 44,
        "createdAt": "2022-12-10T08:08:53.000Z",
        "updatedAt": "2022-12-10T08:08:53.000Z",
        "User": {
            "id": 44,
            "account": "user4",
            "name": "User4",
            "avatar": "https://loremflickr.com/320/240/logo/?lock=4"
        }
    },
    {
        "id": 334,
        "description": "Dolores vel et dolores rerum id officiis tenetur d",
        "UserId": 44,
        "createdAt": "2022-12-10T08:08:53.000Z",
        "updatedAt": "2022-12-10T08:08:53.000Z",
        "User": {
            "id": 44,
            "account": "user4",
            "name": "User4",
            "avatar": "https://loremflickr.com/320/240/logo/?lock=4"
        }
    },
    {
        "id": 344,
        "description": "Ut repellendus atque.",
        "UserId": 44,
        "createdAt": "2022-12-10T08:08:53.000Z",
        "updatedAt": "2022-12-10T08:08:53.000Z",
        "User": {
            "id": 44,
            "account": "user4",
            "name": "User4",
            "avatar": "https://loremflickr.com/320/240/logo/?lock=4"
        }
    },
    {
        "id": 354,
        "description": "Qui eligendi voluptatem hic quia id accusantium an",
        "UserId": 44,
        "createdAt": "2022-12-10T08:08:53.000Z",
        "updatedAt": "2022-12-10T08:08:53.000Z",
        "User": {
            "id": 44,
            "account": "user4",
            "name": "User4",
            "avatar": "https://loremflickr.com/320/240/logo/?lock=4"
        }
    },
    {
        "id": 364,
        "description": "Maxime consequatur quod vitae debitis sed pariatur",
        "UserId": 44,
        "createdAt": "2022-12-10T08:08:53.000Z",
        "updatedAt": "2022-12-10T08:08:53.000Z",
        "User": {
            "id": 44,
            "account": "user4",
            "name": "User4",
            "avatar": "https://loremflickr.com/320/240/logo/?lock=4"
        }
    },
    {
        "id": 374,
        "description": "Et voluptatem dicta omnis natus nesciunt. Molestia",
        "UserId": 44,
        "createdAt": "2022-12-10T08:08:53.000Z",
        "updatedAt": "2022-12-10T08:08:53.000Z",
        "User": {
            "id": 44,
            "account": "user4",
            "name": "User4",
            "avatar": "https://loremflickr.com/320/240/logo/?lock=4"
        }
    },
    {
        "id": 384,
        "description": "Consequatur explicabo quia quos repudiandae incidu",
        "UserId": 44,
        "createdAt": "2022-12-10T08:08:53.000Z",
        "updatedAt": "2022-12-10T08:08:53.000Z",
        "User": {
            "id": 44,
            "account": "user4",
            "name": "User4",
            "avatar": "https://loremflickr.com/320/240/logo/?lock=4"
        }
    },
    {
        "id": 394,
        "description": "minus",
        "UserId": 44,
        "createdAt": "2022-12-10T08:08:53.000Z",
        "updatedAt": "2022-12-10T08:08:53.000Z",
        "User": {
            "id": 44,
            "account": "user4",
            "name": "User4",
            "avatar": "https://loremflickr.com/320/240/logo/?lock=4"
        }
    },
    {
        "id": 404,
        "description": "voluptates",
        "UserId": 54,
        "createdAt": "2022-12-10T08:08:53.000Z",
        "updatedAt": "2022-12-10T08:08:53.000Z",
        "User": {
            "id": 54,
            "account": "user5",
            "name": "User5",
            "avatar": "https://loremflickr.com/320/240/logo/?lock=5"
        }
    },
    {
        "id": 414,
        "description": "Quia doloremque sit velit qui voluptas doloribus v",
        "UserId": 54,
        "createdAt": "2022-12-10T08:08:53.000Z",
        "updatedAt": "2022-12-10T08:08:53.000Z",
        "User": {
            "id": 54,
            "account": "user5",
            "name": "User5",
            "avatar": "https://loremflickr.com/320/240/logo/?lock=5"
        }
    },
    {
        "id": 424,
        "description": "suscipit dignissimos esse",
        "UserId": 54,
        "createdAt": "2022-12-10T08:08:53.000Z",
        "updatedAt": "2022-12-10T08:08:53.000Z",
        "User": {
            "id": 54,
            "account": "user5",
            "name": "User5",
            "avatar": "https://loremflickr.com/320/240/logo/?lock=5"
        }
    },
    {
        "id": 434,
        "description": "Reiciendis ut quis. Quam quia qui odio ullam quam ",
        "UserId": 54,
        "createdAt": "2022-12-10T08:08:53.000Z",
        "updatedAt": "2022-12-10T08:08:53.000Z",
        "User": {
            "id": 54,
            "account": "user5",
            "name": "User5",
            "avatar": "https://loremflickr.com/320/240/logo/?lock=5"
        }
    },
    {
        "id": 444,
        "description": "Consequuntur ducimus a sit.\nEx et maxime.\nSit modi",
        "UserId": 54,
        "createdAt": "2022-12-10T08:08:53.000Z",
        "updatedAt": "2022-12-10T08:08:53.000Z",
        "User": {
            "id": 54,
            "account": "user5",
            "name": "User5",
            "avatar": "https://loremflickr.com/320/240/logo/?lock=5"
        }
    },
    {
        "id": 454,
        "description": "Dignissimos enim omnis ab a omnis vitae nesciunt p",
        "UserId": 54,
        "createdAt": "2022-12-10T08:08:53.000Z",
        "updatedAt": "2022-12-10T08:08:53.000Z",
        "User": {
            "id": 54,
            "account": "user5",
            "name": "User5",
            "avatar": "https://loremflickr.com/320/240/logo/?lock=5"
        }
    },
    {
        "id": 464,
        "description": "Nihil ut blanditiis quibusdam tenetur et error dol",
        "UserId": 54,
        "createdAt": "2022-12-10T08:08:53.000Z",
        "updatedAt": "2022-12-10T08:08:53.000Z",
        "User": {
            "id": 54,
            "account": "user5",
            "name": "User5",
            "avatar": "https://loremflickr.com/320/240/logo/?lock=5"
        }
    },
    {
        "id": 474,
        "description": "Quia et nihil et et molestiae id tenetur. Libero d",
        "UserId": 54,
        "createdAt": "2022-12-10T08:08:53.000Z",
        "updatedAt": "2022-12-10T08:08:53.000Z",
        "User": {
            "id": 54,
            "account": "user5",
            "name": "User5",
            "avatar": "https://loremflickr.com/320/240/logo/?lock=5"
        }
    },
    {
        "id": 484,
        "description": "Sed eos sed. Qui debitis reprehenderit autem offic",
        "UserId": 54,
        "createdAt": "2022-12-10T08:08:53.000Z",
        "updatedAt": "2022-12-10T08:08:53.000Z",
        "User": {
            "id": 54,
            "account": "user5",
            "name": "User5",
            "avatar": "https://loremflickr.com/320/240/logo/?lock=5"
        }
    },
    {
        "id": 494,
        "description": "sint laborum impedit",
        "UserId": 54,
        "createdAt": "2022-12-10T08:08:53.000Z",
        "updatedAt": "2022-12-10T08:08:53.000Z",
        "User": {
            "id": 54,
            "account": "user5",
            "name": "User5",
            "avatar": "https://loremflickr.com/320/240/logo/?lock=5"
        }
    }
]


const AdminAllTweetsPage = () => {
  const pathname = useLocation().pathname
  const adminTweetItemHelper = response.map((data) => (
    <AdminTweetItem data={data} key={data.id}/>
  ))
  return (
    <AdminGrid pathname={pathname}>
      <div className={styles.adminAllTweets}>
        <div className={styles.title}>推文清單</div>
        {adminTweetItemHelper}
      </div>
    </AdminGrid>
  )
}
export default AdminAllTweetsPage
