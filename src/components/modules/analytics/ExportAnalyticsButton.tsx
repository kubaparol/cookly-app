'use client';

import { Download, Loader2 } from 'lucide-react';
import { useState } from 'react';

import { convertToCSV } from '@/utils';

import { exportAnalyticsData } from '@/db';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface ExportAnalyticsButtonProps {
  period: string;
}

export function ExportAnalyticsButton({ period }: ExportAnalyticsButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleExport = async (section: string) => {
    setIsLoading(true);
    try {
      const data = await exportAnalyticsData(period);
      if (!data) {
        console.error('Failed to export data');
        return;
      }

      let csvContent = '';
      let filename = '';

      if (section === 'all') {
        csvContent = convertToCSV(data, 'all');
        filename = `cookly-analytics-all-${period}.csv`;
      } else {
        csvContent = convertToCSV(data[section as keyof typeof data], section);
        filename = `cookly-analytics-${section}-${period}.csv`;
      }

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', filename);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error exporting data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" disabled={isLoading}>
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Download className="mr-2 h-4 w-4" />
          )}
          {isLoading ? 'Exporting...' : 'Export Data'}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleExport('all')}>Export All Data</DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleExport('metrics')}>Export Metrics</DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleExport('topRecipes')}>
          Export Top Recipes
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleExport('recipePerformance')}>
          Export Recipe Performance
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleExport('engagements')}>
          Export Engagements
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleExport('sentiment')}>
          Export Sentiment
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleExport('recentComments')}>
          Export Recent Comments
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
