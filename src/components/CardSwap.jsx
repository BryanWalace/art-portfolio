import React, {
  Children, cloneElement, forwardRef, isValidElement, useEffect, useMemo, useRef,
} from "react";
import gsap from "gsap";
import "./CardSwap.css";

export const Card = forwardRef(({ customClass, imageSrc, children, ...rest }, ref) => (
  <div ref={ref} {...rest} className={`card ${customClass ?? ""} ${rest.className ?? ""}`.trim()}>
    {imageSrc ? <img src={imageSrc} alt="" className="card-image" /> : children}
  </div>
));

Card.displayName = "Card";

const makeSlot = (i, distX, distY, total) => ({ x: i * distX, y: -i * distY, z: -i * distX * 1.5, zIndex: total - i });
const placeNow = (el, slot, skew) => gsap.set(el, { x: slot.x, y: slot.y, z: slot.z, xPercent: -50, yPercent: -50, skewY: skew, transformOrigin: "center center", zIndex: slot.zIndex, force3D: true });

const CardSwap = ({
  cardDistance = 60, verticalDistance = 70, delay = 5000, pauseOnHover = false, onCardClick, skewAmount = 6, easing = "elastic", children,
}) => {
  const config = easing === "elastic"
    ? { ease: "elastic.out(0.6,0.9)", durDrop: 2, durMove: 2, durReturn: 2, promoteOverlap: 0.9, returnDelay: 0.05 }
    : { ease: "power1.inOut", durDrop: 0.8, durMove: 0.8, durReturn: 0.8, promoteOverlap: 0.45, returnDelay: 0.2 };

  const childArr = useMemo(() => Children.toArray(children), [children]);
  const refs = useMemo(() => childArr.map(() => React.createRef()), [childArr.length]);
  const order = useRef(Array.from({ length: childArr.length }, (_, i) => i));
  const tlRef = useRef(null);
  const intervalRef = useRef();
  const container = useRef(null);

  useEffect(() => {
    const total = refs.length;
    refs.forEach((r, i) => placeNow(r.current, makeSlot(i, cardDistance, verticalDistance, total), skewAmount));

    const swap = () => {
      if (order.current.length < 2) return;
      const [front, ...rest] = order.current;
      const elFront = refs[front].current;
      const tl = gsap.timeline({ onComplete: () => tlRef.current = null });
      tlRef.current = tl;
      tl.to(elFront, { y: "+=600", duration: config.durDrop, ease: config.ease });
      tl.addLabel("promote", `-=${config.durDrop * config.promoteOverlap}`);
      rest.forEach((idx, i) => {
        const el = refs[idx].current;
        const slot = makeSlot(i, cardDistance, verticalDistance, refs.length);
        tl.set(el, { zIndex: slot.zIndex }, "promote");
        tl.to(el, { x: slot.x, y: slot.y, z: slot.z, duration: config.durMove, ease: config.ease }, `promote+=${i * 0.15}`);
      });
      const backSlot = makeSlot(refs.length - 1, cardDistance, verticalDistance, refs.length);
      tl.addLabel("return", `promote+=${config.durMove * config.returnDelay}`);
      tl.call(() => { gsap.set(elFront, { zIndex: backSlot.zIndex }); }, undefined, "return");
      tl.set(elFront, { x: backSlot.x, z: backSlot.z }, "return");
      tl.to(elFront, { y: backSlot.y, duration: config.durReturn, ease: config.ease }, "return");
      tl.call(() => { order.current = [...rest, front]; });
    };

    if (childArr.length > 1) {
      intervalRef.current = window.setInterval(swap, delay);
    }
    
    if (pauseOnHover) {
      const node = container.current;
      const pause = () => { tlRef.current?.pause(); clearInterval(intervalRef.current); };
      const resume = () => { tlRef.current?.play(); if (childArr.length > 1) { intervalRef.current = window.setInterval(swap, delay); } };
      node.addEventListener("mouseenter", pause);
      node.addEventListener("mouseleave", resume);
      return () => { node.removeEventListener("mouseenter", pause); node.removeEventListener("mouseleave", resume); clearInterval(intervalRef.current); };
    }
    return () => clearInterval(intervalRef.current);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardDistance, verticalDistance, delay, pauseOnHover, skewAmount, easing, childArr.length]);

  const rendered = childArr.map((child, i) =>
    isValidElement(child) ? cloneElement(child, {
      key: i,
      ref: refs[i],
      onClick: (e) => {
        child.props.onClick?.(e);
        onCardClick?.(i);
      },
    }) : child
  );

  return (
    <div ref={container} className="card-swap-container">
      {rendered}
    </div>
  );
};

export default CardSwap;