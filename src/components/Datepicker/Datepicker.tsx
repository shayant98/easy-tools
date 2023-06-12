"use client";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@components/ui/popover";
import { Button } from "@components/ui/Button";
import { Calendar } from "@components/ui/Calender";
import { SelectSingleEventHandler } from "react-day-picker";
import { cn } from "@utils/utils";

function DatePicker({ date, setDate }: DatePickerProps) {
  console.log(date);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={"outline"} className={cn(" justify-start text-left font-normal", !date && "text-muted-foreground")}>
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "dd/MM/yyyy") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
      </PopoverContent>
    </Popover>
  );
}

interface DatePickerProps {
  date?: Date;
  setDate: SelectSingleEventHandler;
}

export default DatePicker;
