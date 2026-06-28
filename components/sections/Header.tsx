'use client';

import WaveText from '@/components/WaveText';

export default function Header() {
  return (
    <header className="flex flex-row justify-between py-4 px-8 fixed w-svw top-0 z-50">
      <section className="flex flex-row gap-3 text-center items-center">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip0_1459_80)">
            <path d="M19.1667 20H14.7C13.4875 20 12.5 19.0125 12.5 17.8C12.5 16.9433 12.9983 16.1633 13.7683 15.8125C16.5842 14.5308 18.3333 11.9833 18.3333 9.16583C18.3333 5.03083 14.595 1.66583 10 1.66583C5.405 1.66583 1.66667 5.03167 1.66667 9.16667C1.66667 11.9842 3.41583 14.5317 6.23167 15.8133C7.0025 16.1642 7.5 16.9442 7.5 17.8008C7.5 19.0133 6.51333 20.0008 5.30083 20.0008H0.833333C0.373333 20.0008 0 19.6283 0 19.1675C0 18.7067 0.373333 18.3342 0.833333 18.3342H5.30083C5.595 18.3342 5.83333 18.095 5.83333 17.8008C5.83333 17.5958 5.71833 17.4108 5.54083 17.3308C2.1225 15.7742 0 12.6458 0 9.16667C0 4.1125 4.48583 0 10 0C15.5142 0 20 4.1125 20 9.16667C20 12.6458 17.8767 15.7742 14.4592 17.33C14.2817 17.4108 14.1667 17.595 14.1667 17.8C14.1667 18.0942 14.4058 18.3333 14.7 18.3333H19.1667C19.6275 18.3333 20 18.7058 20 19.1667C20 19.6275 19.6275 20 19.1667 20Z" fill="white" />
          </g>
          <defs>
            <clipPath id="clip0_1459_80">
              <rect width="20" height="20" fill="white" />
            </clipPath>
          </defs>
        </svg>

        <div className="text-5xl/6 font-mont-sign">sanyam.</div>
      </section>

      <section className="flex flex-row justify-end gap-2 border-b pb-1 w-35">
        <a
          href="/Sanyam Rathore - Full Stack.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="cursor-[url('https://cdn.cursors-4u.net/previews/tiny-finger-point-c1336353-32.webp')_32_32,auto]"
        >
          <WaveText text="Resume" /> <span className="text-xl">➚</span>
        </a>
      </section>
    </header>
  );
}