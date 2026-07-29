function App() {
  /* 초기 route를 해시에서 파싱 */
  const [route,    setRoute]    = useState(() => {
    const hash = window.location.hash.slice(1);
    if (hash.startsWith('/postDetail/')) {
      const parts = hash.split('/');
      if (parts[2] && parts[3]) {
        return { page:'postDetail', boardKey:parts[2], postId:parts[3] };
      }
    } else if (hash.startsWith('/')) {
      const parts = hash.slice(1).split('/');
      if (parts[0]) {
        return { page:parts[0], param:parts[1] || null };
      }
    }
    return { page:'home', param:null };
  });
  const [prevRoute, setPrevRoute] = useState({ page:'home', param:null });
  const [lang,     setLang]     = useState('vi');
  const { posts, setPosts, addPost, deletePost, updatePost, addComment, deleteComment, updateComment, deviceId, refreshPosts } = usePosts();

  /* route 변경 시 browser history에 저장 */
  useEffect(() => {
    let url = '/';
    if (route.page === 'postDetail') {
      url = `#/postDetail/${route.boardKey}/${route.postId}`;
    } else if (route.page !== 'home') {
      url = `#/${route.page}/${route.param || ''}`.replace(/\/$/, '');
    }
    window.history.pushState(route, '', url);
  }, [route]);

  /* 페이지 로드 시 해시에서 route 파싱 */
  useEffect(() => {
    const hash = window.location.hash.slice(1); // '#' 제거
    if (!hash) return; // 해시 없으면 기본 페이지로

    if (hash.startsWith('/postDetail/')) {
      const parts = hash.split('/');
      if (parts[2] && parts[3]) {
        setRoute({ page:'postDetail', boardKey:parts[2], postId:parts[3] });
      }
    } else if (hash.startsWith('/')) {
      const parts = hash.slice(1).split('/');
      if (parts[0]) {
        setRoute({ page:parts[0], param:parts[1] || null });
      }
    }
  }, []);

  /* 모바일 뒤로가기 처리 */
  useEffect(() => {
    const handlePopState = (e) => {
      if (e.state && e.state.page) {
        setRoute(e.state);
      } else {
        setRoute({ page:'home', param:null });
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  function nav(r) {
    setPrevRoute(route);
    window.__currentRoute = r; // 최신 route를 window에 저장
    console.log('🟣 [App nav] 현재 route 저장:', r, '이전 route:', route);
    setRoute(r);

    // scrollTarget이 지정되면, 해당 요소로 스크롤
    if (r.scrollTarget) {
      setTimeout(() => {
        const target = document.querySelector(`[data-section="${r.scrollTarget}"]`);
        if (target) {
          console.log(`✅ ${r.scrollTarget} 섹션으로 스크롤`);
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 200);
    } else {
      window.scrollTo({ top:0, behavior:'instant' });
    }
  }
  function goBack() {
    nav(prevRoute);
  }
  function toggleLang() { setLang(l => l === 'vi' ? 'ko' : 'vi'); }

  // App 레벨의 닉네임 변경 함수
  const handleNicknameSaveApp = async (nickname) => {
    if (!nickname?.trim()) return;

    try {
      const deviceId = getDeviceId();

      console.log('🔵 [App] 닉네임 저장 시작:', nickname);

      // 1단계: 새 닉네임 설정
      window.userNickname = nickname;
      localStorage.setItem('vb_nickname', nickname);
      const saved = await NicknameDB.save(deviceId, nickname);
      console.log('🔵 [App] NicknameDB.save() 완료:', saved);

      // 2단계: 과거 글/댓글 업데이트
      let updateCount = 0;
      const updatedPostsList = posts.map(p => {
        if (p.deviceId === deviceId) {
          updateCount++;
          console.log(`✅ 글 업데이트: "${p.title}" → ${nickname}`);
          const updatedComments = (p.commentsData || []).map(c => c.deviceId === deviceId ? { ...c, author: nickname } : c);
          return { ...p, author: nickname, commentsData: updatedComments, comments: updatedComments.length };
        } else {
          const hasOwnComment = p.commentsData?.some(c => c.deviceId === deviceId);
          if (hasOwnComment) {
            console.log(`✅ 댓글 업데이트: "${p.title}"`);
            const updatedComments = p.commentsData.map(c => c.deviceId === deviceId ? { ...c, author: nickname } : c);
            return { ...p, commentsData: updatedComments, comments: updatedComments.length };
          }
        }
        return p;
      });

      console.log('🔵 [App] 총 업데이트:', updateCount);

      // 3단계: React state 업데이트
      setPosts(updatedPostsList);

      // 4단계: Firebase 저장
      if (updateCount > 0) {
        try {
          const response = await fetch(FIREBASE_POSTS_URL, {
            method: 'PUT',
            body: JSON.stringify(updatedPostsList),
            headers: { 'Content-Type': 'application/json' }
          });
          console.log('🔵 [App] Firebase 저장 완료:', response.status);
        } catch (err) {
          console.error('❌ Firebase 저장 실패:', err.message);
        }
      }

      console.log('✅ [App] 닉네임 변경 완료!');
      return true;
    } catch (err) {
      console.error('❌ [App] 오류:', err);
      return false;
    }
  };

  const shared = { nav, posts, lang, onAddPost:addPost, onDeletePost:deletePost, onUpdatePost:updatePost, onAddComment:addComment, onDeleteComment:deleteComment, onUpdateComment:updateComment, deviceId, onNicknameSave:handleNicknameSaveApp, refreshPosts };


  switch (route.page) {
    case 'checklist':
      if (route.param==='score_e74') return <ScorePage type='e74' onBack={goBack} lang={lang} />;
      if (route.param==='score_f27') return <ScorePage type='f27' onBack={goBack} lang={lang} />;
      if (route.param==='score_f5') return <ScorePage type='f5' onBack={goBack} lang={lang} />;
      if (route.param==='score') return <ScorePage type='e74' onBack={goBack} lang={lang} />;
      if (route.param==='f27_criteria') return <F27CriteriaPage onBack={goBack} lang={lang} />;
      return null;
    case 'docs':         return <DocsPage         onBack={goBack} lang={lang} />;
    case 'docsChecklist': return <DocsChecklistPage visaStep={route.param} onBack={goBack} lang={lang} />;
    case 'office':       return <OfficePage       onBack={goBack} lang={lang} />;
    case 'eligibility':  return <EligibilityPage  visaStep={route.param} onBack={goBack} lang={lang} />;
    case 'assessment':   return <AssessmentCriteriaPage assessmentParam={route.param} onBack={goBack} lang={lang} />;
    case 'classicBoard': return <ClassicBoardPage boardKey={route.param} {...shared} />;
    case 'postDetail':   return <PostDetailPage   boardKey={route.boardKey} postId={route.postId} {...shared} />;
    case 'visaHub':      return <VisaHubPage      nav={nav} lang={lang} posts={posts} />;
    case 'write':        return <WritePage        initCat={route.param}  editPost={route.editPost} route={route} {...shared} />;
    case 'admin':        return <AdminPage        nav={nav} posts={posts} {...shared} />;
    default:             return <HomePage         {...shared} toggleLang={toggleLang} />;
  }
}
