/**
 * `connect` is a higher order component that connects a component to the logic enhancement layer
 * @param mapIncomingPropsToPassthroughProps
 * @param mapDispatchToProps
 *
 * @example
 * ```tsx
 * const mapIncomingPropsToPassthroughProps = (props: GenericIncomingProps) => ({
 *   ...props,
 * });
 * const mapDispatchToProps = () => {
 *   const someCallback = () => {
 *     // do something
 *   };
 *   return {
 *     dispatch: someCallback,
 *   };
 * };
 *
 * const someEnhancedComponent =
 *   connect(
 *     mapIncomingPropsToPassthroughProps,
 *     mapDispatchToProps
 *   )(Dummy_SomeComponent);
 * ```
 *
 * @returns {React.ComponentType<GenericProps>}
 */
export const connect = <GenericProps extends object, GenericIncomingProps extends object>(
  mapIncomingPropsToPassthroughProps: (
    props: GenericIncomingProps
  ) => Partial<GenericProps> | Partial<GenericProps>,
  mapDispatchToProps?: () => Partial<GenericProps | any> | Partial<GenericProps | any>
) => {
  const isFunction = (value: any) => typeof value === 'function';

  const _mapStateToProps =
    mapIncomingPropsToPassthroughProps ??
    ((() => ({})) as any as typeof mapIncomingPropsToPassthroughProps);
  const _mapDispatchToProps =
    mapDispatchToProps ?? (() => ({}) as any as typeof mapDispatchToProps);

  return (component: (props: GenericProps) => React.ReactNode) => {
    return (props: GenericIncomingProps) => {
      const propsForComponent = isFunction(_mapStateToProps)
        ? _mapStateToProps(props)
        : _mapStateToProps;
      const dispatchProps = isFunction(_mapDispatchToProps)
        ? _mapDispatchToProps()
        : (_mapDispatchToProps ?? {});
      const combinedProps = {
        ...propsForComponent,
        ...dispatchProps,
      } as GenericProps;

      return component(combinedProps);
    };
  };
};
