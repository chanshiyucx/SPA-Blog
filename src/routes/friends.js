import React, { PureComponent } from 'react'
import { connect } from 'dva'
import styled from 'styled-components'
import { Transition, Reveal } from 'semantic-ui-react'
import Gitalk from 'gitalk'
import Quote from '../components/quote'
import Loading from '../components/loading'
import config from '../config'
const { friends } = config

const Container = styled.div`
  margin: 0 auto;
  @media (max-width: 900px) {
    width: 96%;
  }
`

const Wapper = styled.div`
  padding: 16px;
  border-radius: 3px;
  box-shadow: 0 3px 6px rgba(0,0,0,.16), 0 3px 6px rgba(0,0,0,.23);
  background: rgba(255, 255, 255, .6);
`

const FriendList = styled.div`
  padding: 16px 1%;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
`

const Friend = styled.a`
  margin-bottom: 16px;
  width: 200px;
  height: 112px;
  overflow: hidden;
  border-radius: 3px;
  box-shadow: 0 3px 6px rgba(0,0,0,.16), 0 3px 6px rgba(0,0,0,.16);
  &:hover {
    .cover {
      transform: scale(1.1);
    }
  }
`

const Cover = styled.img`
  width: 200px;
  height: 112px;
  transition: transform .6s ease-out;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 112px;
  background: rgba(255, 255, 255, .4);
`

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  margin-bottom: -16px;
  border-radius: 50%;
  box-shadow: 0 0 9px #666;
  z-index: 1;
`

const Site = styled.span`
  padding: 20px 0 8px;
  width: 100%;
  text-align: center;
  font-size: 16px;
  letter-spacing: 1px;
  box-shadow: 0 0 6px #999;
  background: rgba(255, 255, 255, .6);
`

class Friends extends PureComponent {
  componentDidMount() {
    this.props.dispatch({
      type: 'site/showFriends',
    })

    const gitalk = new Gitalk({
      clientID: '655fdc97b211a9f4f4a9',
      clientSecret: '77867cd14723002397338fcb76d139b13bdec439',
      repo: 'BlogComments',
      owner: 'chanshiyucx',
      admin: ['chanshiyucx'],
      // facebook-like distraction free mode
      distractionFreeMode: false,
      title: '友链'
    })
    // 渲染评论
    gitalk.render('gitalk')
  }

  componentWillUnmount() {
    this.props.dispatch({
      type: 'site/reset',
      payload: {
        showFriends: false,
      }
    })
  }

  renderFriends = () => {
    if (friends && friends.length > 0) {
      const friendList = friends.map((o, i) => {
        return (
          <Friend key={i} href={o.link} target="_blank">
            <Reveal animated='move up'>
              <Reveal.Content hidden>
                <Cover className='cover' alt='' src={o.cover} />
              </Reveal.Content>
              <Reveal.Content visible>
                <Content>
                  <Avatar alt='' src={o.avatar} />
                  <Site>{o.name}</Site>
                </Content>
              </Reveal.Content>
            </Reveal>
          </Friend>
        )
      })
      return friendList
    }
  }

  render() {
    const { showFriends } = this.props
    const text = '莫愁前路无知己，天下谁人不识君'
    return (
      <Container>
        <Wapper>
          <Transition visible={showFriends} animation='scale' duration={800}>
            <div>
              <Quote text={text} />
              <FriendList>
                {this.renderFriends()}
              </FriendList>
            </div>
          </Transition>
          {!showFriends &&
            <Loading />
          }
        </Wapper>
        <div id='gitalk'></div>
      </Container>
    )
  }

}

export default connect(({ site }) => ({ ...site }))(Friends)