import Loadable from 'react-loadable'
import { DelayLoading } from '../utils/util'

// 首页
const Index = Loadable({
    loader: () => import('../views/index/indexContent'),
    loading: DelayLoading,
    delay: 300
})

// 留言
const LeaveMessage = Loadable({
    loader: () => import('../views/leaveMessage/index'), 
    loading : DelayLoading,
    delay:300
})

// 留言详细列表
const MessageDetailList = Loadable({
    loader: () => import('../views/leaveMessage/messageDetail/index'), 
    loading : DelayLoading,
    delay:300
})

// 点赞
const Likes = Loadable({
    loader: () => import('../views/likes/index'), 
    loading : DelayLoading,
    delay:300
})

// 新建点赞
const CreateLikes = Loadable({
    loader: () => import('../views/likes/createlikes/index'), 
    loading : DelayLoading,
    delay:300
})

// 投票
const Vote = Loadable({
    loader: () => import('../views/vote/index'), 
    loading : DelayLoading,
    delay:300
})

// 新建投票
const CreateVote = Loadable({
    loader: () => import('../views/vote/createVote/index'), 
    loading : DelayLoading,
    delay:300
})

// 答题
const Answer = Loadable({
    loader: () => import('../views/answer/index'), 
    loading : DelayLoading,
    delay:300
})

// 新建答题
const CreateAnswer = Loadable({
    loader: () => import('../views/answer/createAnswer/index'), 
    loading : DelayLoading,
    delay:300
})

// 问卷
const Questionnaire = Loadable({
    loader: () => import('../views/questionnaire/index'), 
    loading : DelayLoading,
    delay:300
})

// 新建问卷
const CreateQuestionnaire = Loadable({
    loader: () => import('../views/questionnaire/createQuestionnaire/index'), 
    loading : DelayLoading,
    delay:300
})

// 抽奖
const LuckDraw = Loadable({
    loader: () => import('../views/luckDraw/index'), 
    loading : DelayLoading,
    delay:300
})

// 新建抽奖
const CreateLuckDraw = Loadable({
    loader: () => import('../views/luckDraw/createLuckDraw/index'), 
    loading : DelayLoading,
    delay:300
})

export default [
    {
        'path': '/index',
        'component': Index
    },
    {
        'path': '/messageManage',
        'component': LeaveMessage,
    },
    {
        'path': '/messageManage/MessageDetailList',
        'component': MessageDetailList,
    },
    {
        'path': '/likesManage',
        'component': Likes
    },
    {
        'path': '/likesManage/createLikes',
        'component': CreateLikes
    },
    {
        'path': '/voteManage',
        'component': Vote
    },
    {
        'path': '/voteManage/createVote',
        'component': CreateVote
    },
    {
        'path': '/answerManage',
        'component': Answer
    },
    {
        'path': '/answerManage/createAnswer',
        'component': CreateAnswer
    },
    {
        'path': '/questionnaireManage',
        'component': Questionnaire
    },
    {
        'path': '/questionnaireManage/createQuestionnaire',
        'component': CreateQuestionnaire
    },
    {
        'path': '/luckDrawManage',
        'component': LuckDraw
    },
    {
        'path': '/luckDrawManage/createLuckDraw',
        'component': CreateLuckDraw
    },
]