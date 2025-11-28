// サポートページ専用JavaScript - 検索・フィルター機能

document.addEventListener('DOMContentLoaded', function() {
    // FAQデータ
    // 画像を追加する場合は、imageプロパティに画像のパスを指定してください
    // 例: image: '../image/example.png'
    const faqData = [
        {
            category: 'app',
            question: 'Check Trashとは何ですか？',
            answer: 'Check Trashは、ゴミの分別日を確認できるスマートフォンアプリです。いつでもどこでも、お住まいの地域のゴミ収集日を簡単に確認できます。',
            image: null // 画像がない場合はnullまたは省略可能
        },
        {
            category: 'app',
            question: 'どの地域に対応していますか？',
            answer: '現在、日本国内の主要な自治体に対応しています。対応地域は順次拡大予定です。',
            image: null
        },
        {
            category: 'app',
            question: 'アプリは無料で使えますか？',
            answer: '基本的な機能は無料でご利用いただけます。一部の高度な機能（Check AIなど）は有料サブスクリプションが必要です。',
            image: null
        },
        {
            category: 'app',
            question: 'Android版とiOS版の違いはありますか？',
            answer: '基本的な機能は同じですが、プラットフォームごとに最適化されています。一部の機能はプラットフォームによって異なる場合があります。',
            image: null
        },
        {
            category: 'account',
            question: 'アカウント作成は必要ですか？',
            answer: '基本的な機能を使用する場合はアカウント作成は不要です。ただし、データの同期や高度な機能を利用する場合はアカウント作成をお勧めします。',
            image: null
        },
        {
            category: 'account',
            question: 'アカウントを削除する方法は？',
            answer: 'アプリの設定画面から「アカウント削除」を選択してください。削除前にデータのバックアップを取ることをお勧めします。',
            image: null
        },
        {
            category: 'troubleshooting',
            question: 'アプリが起動しない',
            answer: '以下の方法をお試しください：<ul><li>アプリを再起動する</li><li>スマートフォンを再起動する</li><li>アプリを最新版に更新する</li><li>ストレージ容量を確認する</li></ul>',
            image: null
        },
        {
            category: 'troubleshooting',
            question: '通知が来ない',
            answer: '以下の設定を確認してください：<ul><li>アプリの通知設定が有効になっているか</li><li>スマートフォンの通知設定が有効になっているか</li><li>バッテリー最適化の設定を確認する</li></ul>',
            image: null
        },
        {
            category: 'troubleshooting',
            question: 'ゴミの日が正しく表示されない',
            answer: '地域設定が正しいか確認してください。自治体の情報が変更されている場合は、アプリを最新版に更新するか、お問い合わせください。',
            image: null
        },
        {
            category: 'subscription',
            question: 'Check AIとは何ですか？',
            answer: 'Check AIは、AIを活用してゴミの分別を自動で判定する機能です。写真を撮るだけで、そのゴミがどの分類に該当するかを教えてくれます。',
            image: null
        },
        {
            category: 'subscription',
            question: 'サブスクリプションの解約方法は？',
            answer: 'アプリ内の設定画面、またはApp Store/Google Playのサブスクリプション管理画面から解約できます。',
            image: null
        },
        {
            category: 'subscription',
            question: 'サブスクリプションの料金は？',
            answer: '料金プランの詳細は、アプリ内のサブスクリプション画面でご確認いただけます。',
            image: null
        },
        {
            category: 'other',
            question: 'ベータ版に参加する方法は？',
            answer: 'Android版はGitHubから、iOS版はTestFlightからインストールできます。詳細は<a href="../index.html#team-betaprogram">こちら</a>をご確認ください。',
            image: null
        },
        {
            category: 'other',
            question: 'バグを報告する方法は？',
            answer: 'アプリ内のフィードバックフォーム、または<a href="https://docs.google.com/forms/d/e/1FAIpQLSfNUyHpEPHh3ZoYpSL0QeZuDzrCmWdOmchNbwl-8b0fFmDAMg/viewform?usp=header" target="_blank" rel="noopener">こちらのフォーム</a>から報告できます。',
            image: null
        },
        {
            category: 'other',
            question: '機能のリクエストはできますか？',
            answer: 'はい、フィードバックフォームから機能のリクエストをお送りいただけます。開発チームで検討させていただきます。',
            image: null
        }
    ];

    // カテゴリ名の日本語マッピング
    const categoryNames = {
        'all': 'すべて',
        'app': 'アプリについて',
        'account': 'アカウント',
        'troubleshooting': 'トラブルシューティング',
        'subscription': 'サブスクリプション',
        'other': 'その他'
    };

    const searchInput = document.getElementById('searchInput');
    const categoryFilters = document.getElementById('categoryFilters');
    const faqList = document.getElementById('faqList');
    const noResults = document.getElementById('noResults');
    const resultsCount = document.getElementById('resultsCount');

    let currentCategory = 'all';
    let currentSearch = '';

    // FAQリストを初期化
    function initFAQList() {
        faqList.innerHTML = '';
        faqData.forEach((faq, index) => {
            const faqItem = createFAQItem(faq, index);
            faqList.appendChild(faqItem);
        });
        updateResultsCount();
    }

    // FAQアイテムを作成
    function createFAQItem(faq, index) {
        const item = document.createElement('div');
        item.className = 'faq-item';
        item.dataset.category = faq.category;
        item.dataset.index = index;

        const category = document.createElement('span');
        category.className = 'faq-category';
        category.textContent = categoryNames[faq.category];

        const question = document.createElement('div');
        question.className = 'faq-question';
        question.textContent = faq.question;

        const answer = document.createElement('div');
        answer.className = 'faq-answer';
        answer.innerHTML = faq.answer;

        item.appendChild(category);
        item.appendChild(question);
        
        // 画像がある場合は追加
        if (faq.image) {
            const imageContainer = document.createElement('div');
            imageContainer.className = 'faq-image-container';
            const img = document.createElement('img');
            img.src = faq.image;
            img.alt = faq.question;
            img.className = 'faq-image';
            imageContainer.appendChild(img);
            item.appendChild(imageContainer);
        }
        
        item.appendChild(answer);

        return item;
    }

    // 検索とフィルターを実行
    function filterFAQs() {
        const searchTerm = currentSearch.toLowerCase().trim();
        const items = faqList.querySelectorAll('.faq-item');
        let visibleCount = 0;

        items.forEach(item => {
            const category = item.dataset.category;
            const question = item.querySelector('.faq-question').textContent.toLowerCase();
            const answer = item.querySelector('.faq-answer').textContent.toLowerCase();

            // カテゴリフィルター
            const categoryMatch = currentCategory === 'all' || category === currentCategory;

            // 検索フィルター
            const searchMatch = searchTerm === '' || 
                question.includes(searchTerm) || 
                answer.includes(searchTerm);

            if (categoryMatch && searchMatch) {
                item.classList.remove('hidden');
                visibleCount++;
            } else {
                item.classList.add('hidden');
            }
        });

        // 結果がない場合の表示
        if (visibleCount === 0) {
            noResults.classList.add('show');
        } else {
            noResults.classList.remove('show');
        }

        updateResultsCount(visibleCount);
    }

    // 結果数を更新
    function updateResultsCount(count) {
        if (count === undefined) {
            const visibleItems = faqList.querySelectorAll('.faq-item:not(.hidden)');
            count = visibleItems.length;
        }
        const total = faqData.length;
        if (currentSearch || currentCategory !== 'all') {
            resultsCount.textContent = `${count}件の結果が見つかりました（全${total}件中）`;
        } else {
            resultsCount.textContent = '';
        }
    }

    // 検索入力のイベントリスナー
    searchInput.addEventListener('input', function() {
        currentSearch = this.value;
        filterFAQs();
    });

    // カテゴリフィルターボタンのイベントリスナー
    categoryFilters.addEventListener('click', function(e) {
        if (e.target.classList.contains('category-btn')) {
            // アクティブ状態を更新
            categoryFilters.querySelectorAll('.category-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            e.target.classList.add('active');

            // カテゴリを更新
            currentCategory = e.target.dataset.category;
            filterFAQs();
        }
    });

    // 初期化
    initFAQList();
});

