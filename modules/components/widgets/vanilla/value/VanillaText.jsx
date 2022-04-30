import React, { useCallback, useMemo } from "react";
import { Form } from "@shoutout-labs/shoutout-themes-enterprise";
export default (props) => {
  const {
    value,
    setValue,
    config,
    readonly,
    placeholder,
    maxLength,
    fieldDefinition,
    ...rest
  } = props;

  const selectedValue = useMemo(() => {
    return value ? [value] : [];
  }, [value]);

  const onChangeValue = useCallback(
    (e) => {
      setValue(e.length > 0 ? (e[0].value||e[0].title) : undefined);
    },
    [setValue]
  );

  const onBlur = useCallback(
    (e) => {
      setValue(e.currentTarget.value|| undefined);
    },
    [setValue]
  );

  const options = useMemo(() => {
    //This is a hack to pass the values since asyncFetch isn't functioning
    if (fieldDefinition && fieldDefinition.asyncFetch) {
      return fieldDefinition.asyncFetch("").values || [];
    }
    return [];
  }, [fieldDefinition]);

  return (
    <Form.Select
      labelKey="title"
      id="select-typeahead"
      onChange={onChangeValue}
      selected={selectedValue}
      disabled={readonly}
      options={options}
      onBlur={onBlur}
      size="sm"
      placeholder={placeholder}
      {...rest}
    />
  );
};
