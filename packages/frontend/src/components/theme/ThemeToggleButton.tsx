'use client';

import { useState, useEffect } from 'react';
import { IconButton } from '@/components/button/IconButton';
import { Sun, Moon } from 'lucide-react';

export function ThemeToggleButton() {
  const [theme, setTheme] = useState<string>('');

  useEffect(() => {
    // 初期テーマを取得
    const savedTheme = localStorage.getItem('theme');
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const currentTheme = savedTheme || systemTheme;
    setTheme(currentTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);

    // DOM操作でテーマを切り替え
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <IconButton
      icon={theme === 'dark' ? Sun : Moon}
      onClick={toggleTheme}
      title={theme === 'dark' ? 'ライトモードに切り替え' : 'ダークモードに切り替え'}
      variant="ghost"
    />
  );
}
