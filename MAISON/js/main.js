// header mobile
const menuButton = document.querySelector('header .menu-btn');
const gnb = document.querySelector('header .gnb');

menuButton.addEventListener('click', function() {

    menuButton.classList.toggle('open');
    gnb.classList.toggle('open');

});

// 모바일 링크
const mobileNavLinks = document.querySelectorAll('header .gnb a');

mobileNavLinks.forEach(function(link) {

    link.addEventListener('click', function() {

        menuButton.classList.remove('open');
        gnb.classList.remove('open');

    });

});



// menu contents
const menuSlides = document.querySelectorAll('.menu .slide');
const menuPrice = document.querySelector('.menu .cont-pay');
const menuNameKr = document.querySelector('.menu-cont .cont-place .tit');
const menuNameEn = document.querySelector('.menu-cont .cont-place .overline');
const menuDescKr = document.querySelector('.menu-cont .cont-place .txt.kr');
const menuDescEn = document.querySelector('.menu-cont .cont-place .txt.en');
const menuImage = document.querySelector('.menu-cont .menu-view img');

let selectedMenu = document.querySelector('.slide-wrap .slide.active');

const menuSection = document.querySelector('.menu');
const menuInner = document.querySelector('.menu .inner');
const slideList = document.querySelector('.slide-wrap .slide-list');

const scrollPerMenu = 600;

// const menuScrollHeight = menuInner.offsetHeight + menuSlides.length * scrollPerMenu;

// menuSection.style.height = `${menuScrollHeight}px`;

const menuNavigation = document.querySelector('.menu .navigation ul');


// 네비게이션 리스트
menuSlides.forEach(function(item, index) {
    const li = document.createElement('li');
    const link = document.createElement('a');
    
    menuNavigation.appendChild(li);
    li.appendChild(link);    
    
    if (index === 0) {
        li.classList.add('on');
    }

});

const navigationItems = document.querySelectorAll('.menu .navigation li');

let currentIndex = -1;

// 메뉴 스크롤 sticky
window.addEventListener('scroll', function() {
    
    if (window.innerWidth <= 1100) {
        return;
    }   
    const menuTop = menuSection.offsetTop;
    const scrollY = window.scrollY;
    
    const menuScroll = scrollY - menuTop;
    const menuIndex = Math.floor(menuScroll / scrollPerMenu);
    const safeIndex = Math.max(0, Math.min(menuSlides.length - 1, menuIndex));

    const moveIndex = Math.max(0, safeIndex - 3);
    const slideWidth = menuSlides[0].offsetWidth;
    const slideStyle = getComputedStyle(slideList);
    const slideGap = parseFloat(slideStyle.gap);

    const moveOffset = moveIndex * (slideWidth + slideGap);        

    if (safeIndex !== currentIndex) {
        currentIndex = safeIndex;
        
        selectedMenu = menuSlides[safeIndex];

        changeMenu(menuSlides[safeIndex]);
        
        menuSlides.forEach(function(slide) {
            slide.classList.remove('active');
        });
        menuSlides[safeIndex].classList.add('active');        
        
        navigationItems.forEach(function(item) {
            item.classList.remove('on');
        });

        navigationItems[safeIndex].classList.add('on');

        slideList.style.transform = `translateX(${-moveOffset}px)`;
    }

});

// 메뉴 선택
menuSlides.forEach(function(item) {

    item.addEventListener('mouseenter', function() {
        changeMenu(item);
    });

    item.addEventListener('mouseleave', function() {
        changeMenu(selectedMenu);
    });

    item.addEventListener('click', function() {

        changeMenu(item);

        menuSlides.forEach(function(slide) {
            slide.classList.remove('active');
        });

        item.classList.add('active');
        selectedMenu = item;
    });

});


//  메뉴 좌.우 슬라이드 버튼
const slideViewport = document.querySelector('.slide-viewport');
const prevSlideBtn = document.querySelector('.slide-arrow .prev');
const nextSlideBtn = document.querySelector('.slide-arrow .next');

prevSlideBtn.addEventListener('click', function() {

    const slideWidth = menuSlides[0].offsetWidth + 10;

    slideViewport.scrollBy({
        left: -slideWidth,
        behavior: 'smooth'
    });
});

nextSlideBtn.addEventListener('click', function() {

    const slideWidth = menuSlides[0].offsetWidth + 10;

    slideViewport.scrollBy({
        left: slideWidth,
        behavior: 'smooth'
    });
});


function changeMenu(item) {
    menuPrice.textContent = item.dataset.price;
    menuNameKr.textContent = item.dataset.nameKr;
    menuNameEn.textContent = item.dataset.nameEn;
    menuDescKr.textContent = item.dataset.descKr;
    menuDescEn.textContent = item.dataset.descEn;
    menuImage.src = item.dataset.image;
}

function setMenuHeight() {

    if (window.innerWidth <= 1100) {

        menuSection.style.height = 'auto';

    } else {

        const menuScrollHeight =
            menuInner.offsetHeight +
            menuSlides.length * scrollPerMenu;

        menuSection.style.height =
            `${menuScrollHeight}px`;
    }
}

setMenuHeight();

window.addEventListener('resize', setMenuHeight);


// 헤더 스크롤 스파이
const navLinks = document.querySelectorAll('header nav a');
const sections = document.querySelectorAll('section[id]');

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        
        if (entry.isIntersecting) {
               
            navLinks.forEach(function(link) {
                link.classList.remove('active');
               
                if (link.getAttribute('href') === '#' + entry.target.id) {                    
                    link.classList.add('active');
                }
            });
        }        

    });
},{
    rootMargin: '-35% 0px -60% 0px'
});


sections.forEach(function(section){
    observer.observe(section)
});


// 예약 관리 (날짜)
const dateButtons = document.querySelectorAll('.reservation .calendar-cont button');
const dateText = document.querySelector('.reservation .block01 .txt');
const dateNumber = document.querySelector('.reservation-card .card-cont .card-date');

const monthNames = [
    'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN',
    'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'
];

const prevDateBtn = document.querySelector('.calendar-head .left-btn');
const nextDateBtn = document.querySelector('.calendar-head .right-btn');

let calendarDate = new Date(2026, 8, 13);

const calendarMonth = document.querySelector('.reservation .calendar-head .month');

let selectedDate = '2026.09.15';

dateButtons.forEach(function(item) {

    item.addEventListener('click', function() {

        dateButtons.forEach(function(button) {
            button.classList.remove('active');
        });

        item.classList.add('active');

        selectedDate = item.dataset.date;

        dateText.textContent = item.dataset.date;

        dateText.textContent = item.dataset.date;
        dateNumber.textContent = item.dataset.date;

        const dateParts = item.dataset.date.split('.');
        const monthIndex = Number(dateParts[1]) - 1;
        
        const formattedDate =
        monthNames[monthIndex] + ' ' +
        dateParts[2] + ', ' +
        dateParts[0];

        dateNumber.textContent = formattedDate;

        item.closest('.block').classList.remove('open');

    });

});

nextDateBtn.addEventListener('click', function() {

    calendarDate.setDate(calendarDate.getDate() + 7);

    renderCalendar();

});

prevDateBtn.addEventListener('click', function() {

    calendarDate.setDate(calendarDate.getDate() - 7);

    renderCalendar();

});

const dayNames = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

function renderCalendar() {

    dateButtons.forEach(function(button, index) {

        const itemDate = new Date(calendarDate);

        itemDate.setDate(itemDate.getDate() + index);

        const year = itemDate.getFullYear();
        const month = String(itemDate.getMonth() + 1).padStart(2, '0');
        const date = String(itemDate.getDate()).padStart(2, '0');
        const day = dayNames[itemDate.getDay()];

        button.querySelector('.day').textContent = day;
        button.querySelector('.num').textContent = date;
        button.dataset.date = year + '.' + month + '.' + date;

        if (button.dataset.date === selectedDate) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }

    });

    const currentYear = calendarDate.getFullYear();
    const currentMonth = calendarDate.getMonth();

    calendarMonth.textContent =
        monthNames[currentMonth] + ' ' + currentYear;

}

// 예약 관리 (시간)
const timeButtons = document.querySelectorAll('.reservation .time-options .time-btn');
const timeText = document.querySelector('.reservation .block02 .txt');
const timeNumber = document.querySelector('.reservation-card .card-cont .card-time')

timeButtons.forEach(function(item) {

    item.addEventListener('click', function() {

        timeButtons.forEach(function(button) {
            button.classList.remove('active');
        });

        item.classList.add('active');

        timeText.textContent = item.textContent;
        timeNumber.textContent = item.textContent;

        item.closest('.block').classList.remove('open');

    });
});

// 예약 관리 (인원)
const guestButtons = document.querySelectorAll('.guest-btn');
const guestText = document.querySelector('.block03 .block-btn .txt');
const guestOption = document.querySelector('.guest-options');
const guestNumber = document.querySelector('.reservation-card .card-num .num');


guestButtons.forEach(function(item) {

    item.addEventListener('click', function() {

        guestButtons.forEach(function(button) {
            button.classList.remove('active')
        });

        item.classList.add('active');

        guestText.textContent = item.textContent
        guestText.dataset.guest = item.dataset.guest;

        guestNumber.textContent = item.dataset.guest;

        item.closest('.block').classList.remove('open');

    });
});


// 예약 관리(팝업 호출)
const reservationBlocks = document.querySelectorAll('.reservation .block');

reservationBlocks.forEach(function(block) {

    const blockButton = block.querySelector('.block-btn');

    blockButton.addEventListener('click', function() {

        reservationBlocks.forEach(function(item){

            if (item !== block) {
                item.classList.remove('open');
            }        
        });

        block.classList.toggle('open');
    });

});


// 예약 관리 (팝업 호출 순차적 or block 바깥 클릭)
document.addEventListener('click', function(event) {

    const clickedBlock = event.target.closest('.reservation .block');

    if (!clickedBlock) {

        reservationBlocks.forEach(function(block) {
            block.classList.remove('open');
        });

    }

});

// 예약 관리 (예약 확인)
const confirmButton = document.querySelector('.reservation .confirm-btn');
const resetButton = document.querySelector('.reservation .reset-btn');
const reservationModal = document.querySelector('.reservation-modal');

const modalDate = document.querySelector('.reservation-modal .modal-date');
const modalTime = document.querySelector('.reservation-modal .modal-time');
const modalGuests = document.querySelector('.reservation-modal .modal-guests');
const modalClose = document.querySelector('.reservation-modal .modal-close');

confirmButton.addEventListener('click', function() {

    modalDate.textContent = dateNumber.textContent;
    modalTime.textContent = timeNumber.textContent;
    modalGuests.textContent = guestNumber.textContent + ' GUESTS';

    reservationModal.classList.add('open');   

});

modalClose.addEventListener('click', function() {
    reservationModal.classList.remove('open');
});

resetButton.addEventListener('click', function() {

    // date
    selectedDate = '2026.09.15';
    calendarDate = new Date(2026, 8, 13);

    dateText.textContent = '2026.09.15';
    dateNumber.textContent = 'SEP 15, 2026';

    renderCalendar();

    // time
    timeText.textContent = '17:00';
    timeNumber.textContent = '17:00';

    timeButtons.forEach(function(button) {

        button.classList.remove('active');

        if (button.textContent.trim() === '17:00') {
            button.classList.add('active');
        }

    });

    // guest
    guestText.textContent = '2 명';
    guestText.dataset.guest = '02';
    guestNumber.textContent = '02';

    guestButtons.forEach(function(button) {

        button.classList.remove('active');

        if (button.dataset.guest === '02') {
            button.classList.add('active');
        }

    });

    // open closed
    reservationBlocks.forEach(function(block) {
        block.classList.remove('open');
    });

});

reservationModal.addEventListener('click', function(event) {

    if (event.target === reservationModal) {
        reservationModal.classList.remove('open');
    }

});


// 갤러리 스크롤
const galleryItems = document.querySelectorAll('.gallery .gallery-item');

const galleryObserver = new IntersectionObserver(function(entries) {

    entries.forEach(function(entry) {

        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }

    });

}, {
    threshold: 0.15
});

galleryItems.forEach(function(item, index) {

    item.style.transitionDelay = (index % 3) * 0.1 + 's';
    galleryObserver.observe(item);

});

// footer 모션
const footerLogo = document.querySelector('.footer .motion-logo');

const footerObserver = new IntersectionObserver(function(entries) {

    entries.forEach(function(entry) {

        if (entry.isIntersecting) {

            entry.target.classList.add('show');
            // footerObserver.unobserve(entry.target);
        } else {
            entry.target.classList.remove('show');
        }

    });

}, {
    threshold: 0.2
});

footerObserver.observe(footerLogo);



