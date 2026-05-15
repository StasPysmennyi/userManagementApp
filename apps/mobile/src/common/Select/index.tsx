import { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { Icons } from 'src/components';

import { Modal, SelectSheet } from 'src/common';

import { TYPES } from 'src/models';

import styles from './styles';

type Props = {
  label?: string;
  value?: string;
  options: readonly TYPES.Option[];
  placeholder?: string;
  error?: string;
  onChange: (value: string) => void;
};

const Select = ({
  label,
  value,
  options,
  placeholder,
  error,
  onChange,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const selected = options.find(option => option.value === value);

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  const handleClose = () => setIsOpen(false);
  const handleOpen = () => setIsOpen(true);

  return (
    <View style={styles.container}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <TouchableOpacity
        onPress={handleOpen}
        activeOpacity={0.75}
        style={[styles.trigger, error ? styles.triggerError : null]}>
        <Text style={[styles.triggerText, !selected && styles.placeholder]}>
          {selected?.label ?? placeholder ?? 'Select...'}
        </Text>
        <Icons.ChevronIcon width={16} height={16} />
      </TouchableOpacity>
      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Modal visible={isOpen} onClose={handleClose}>
        <SelectSheet
          label={label}
          value={value}
          options={options}
          onSelect={handleSelect}
        />
      </Modal>
    </View>
  );
};

export default Select;
