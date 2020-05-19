import { useMedia } from 'react-use';

const sizes = {
  tablet: '1200px',
  phone: '600px',
};

export const media = {
  tablet: `(max-width: ${sizes.tablet})`,
  phone: `(max-width: ${sizes.phone})`,
};

export function useLessSm() {
  return useMedia('(max-width: 576px)');
}
export function useLessXs() {
  return useMedia('(max-width: 768px)');
}
export function useLessMd() {
  return useMedia('(max-width: 992px)');
}
export function useLessLg() {
  return useMedia('(max-width: 1200px)');
}

export function useExceedSm() {
  return useMedia('(min-width: 576px)');
}
export function useExceedXs() {
  return useMedia('(min-width: 768px)');
}
export function useExceedMd() {
  return useMedia('(min-width: 992px)');
}
export function useExceedLg() {
  return useMedia('(min-width: 1200px)');
}
