import {Ref, watch} from "vue";

export function useRefSync<A, B>(
    aRef: Ref<A>,
    bRef: Ref<B>,
    onAChange: (bRef: Ref<B>, newA: A) => void,
    onBChange: (aRef: Ref<A>, newB: B) => void
) {
    watch(
        [aRef, bRef], ([newA, newB], [oldA, oldB]): void => {
            if (newA !== oldA) {
                onAChange(bRef, newA);
            }
            if (newB !== oldB) {
                onBChange(aRef, newB);
            }
        }
    );
}
