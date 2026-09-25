import { useEffect, useState } from "react";

export function useLowPowerMode(): boolean {
  const [isLowPower, setIsLowPower] = useState(false);

  useEffect(() => {
    // Check device memory (if available)
    const deviceMemory = (navigator as any).deviceMemory;
    if (deviceMemory && deviceMemory < 4) {
      setIsLowPower(true);
    }

    // Check hardware concurrency (CPU cores)
    if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
      setIsLowPower(true);
    }

    // Check for mobile devices
    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent,
      );
    if (isMobile) {
      setIsLowPower(true);
    }
  }, []);

  return isLowPower;
}
