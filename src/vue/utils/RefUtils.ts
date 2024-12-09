import {ref, Ref, watch} from "vue";

export function useRefWrapper<T>(
    externalRef: Ref<T>,
    onExternalChange: (wrappedRef: Ref<T>, externalRef: Ref<T>, newValue: T) => void,
    onWrappedChange: (wrappedRef: Ref<T>, externalRef: Ref<T>, newValue: T) => void
): Ref<T> {
    const wrappedRef = ref(externalRef.value) as Ref<T>;

    wrappedRef.value = externalRef.value;

    watch(
        [externalRef, wrappedRef], ([newExternal, newWrapped], [oldExternal, oldWrapped]) => {
            if (newExternal !== oldExternal) {
                onExternalChange(wrappedRef, externalRef, newExternal);
                wrappedRef.value = newExternal;
            }
            if (newWrapped !== oldWrapped) {
                onWrappedChange(wrappedRef, externalRef, newWrapped);
                externalRef.value = newWrapped;
            }
        }
    );

    return wrappedRef;
}
